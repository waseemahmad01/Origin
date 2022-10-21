import { Platform } from 'react-native'
import * as ImagePicker from 'react-native-image-picker'
import * as Permissions from 'react-native-permissions'

export const fileTypeGuard = ({
    uri,
    size,
    name,
    type,
}) => {
    if (!uri) return null
    return { uri, size: size ?? 0, name: name ?? '', type: type ?? '' }
}


const nativePermissionGranted = (
    stats,
    limitedCallback,
) => {
    return Object.values(stats).every(result => {
        if (result === 'granted') return true
        if (result === 'limited') {
            limitedCallback?.()
            return true
        }
        return false
    })
}


function getAndroidStoragePermissionsByAPILevel(permissionModule) {
    if (Platform.OS !== 'android') return []

    if (Platform.Version > 32) {
        return [
            permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
            permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        ]
    }

    if (Platform.Version > 28) {
        return [permissionModule.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
    }

    return [
        permissionModule.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        permissionModule.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]
}

const createNativeFileService = ({
    imagePickerModule,
    permissionModule,
}) => {
    const cameraPermissions = Platform.select({
        ios: [permissionModule.PERMISSIONS.IOS.CAMERA],
        android: [permissionModule.PERMISSIONS.ANDROID.CAMERA],
        default: [],
    })
    const mediaLibraryPermissions = Platform.select({
        ios: [
            permissionModule.PERMISSIONS.IOS.MEDIA_LIBRARY,
            permissionModule.PERMISSIONS.IOS.PHOTO_LIBRARY,
        ],
        android: getAndroidStoragePermissionsByAPILevel(permissionModule),
        default: [],
    })

    class NativeFileService {
        async hasCameraPermission() {
            const status = await permissionModule.checkMultiple(cameraPermissions)
            return nativePermissionGranted(status)
        }
        async requestCameraPermission() {
            const status = await permissionModule.requestMultiple(cameraPermissions)
            return nativePermissionGranted(status)
        }
        async hasMediaLibraryPermission() {
            const status = await permissionModule.checkMultiple(
                mediaLibraryPermissions,
            )
            return nativePermissionGranted(status)
        }
        async requestMediaLibraryPermission() {
            const status = await permissionModule.requestMultiple(
                mediaLibraryPermissions,
            )
            return nativePermissionGranted(status)
        }

        async openCamera(options) {
            const hasPermission = await this.hasCameraPermission()
            if (!hasPermission) {
                const granted = await this.requestCameraPermission()
                if (!granted) {
                    options?.onOpenFailureWithToastMessage?.()
                    return null
                }
            }

            const response = await imagePickerModule.launchCamera({
                quality: 0.3,
                cameraType: options?.cameraType ?? 'back',
                mediaType: options?.mediaType ?? 'photo',
            })
            if (response.didCancel) return null
            if (response.errorCode === 'camera_unavailable') {
                options?.onOpenFailureWithToastMessage?.()
                return null
            }

            const {
                fileName: name,
                fileSize: size,
                type,
                uri,
            } = response.assets?.[0] ?? {}
            return fileTypeGuard({ uri, size, name, type })
        }
        async openMediaLibrary(
            options,
        ) {
            const selectionLimit = options?.selectionLimit || 1
            const granted = await Permissions.requestMultiple(mediaLibraryPermissions)
            if (!granted) {
                options?.onOpenFailureWithToastMessage?.()
                return null
            }

            const response = await imagePickerModule.launchImageLibrary({
                selectionLimit,
                quality: 0.3,
                mediaType: (() => {
                    switch (options?.mediaType) {
                        case 'photo':
                            return 'photo'
                        case 'video':
                            return 'video'
                        default:
                            return 'mixed'
                    }
                })(),
            })
            if (response.didCancel) return null
            if (response.errorCode === 'camera_unavailable') {
                options?.onOpenFailureWithToastMessage?.()
                return null
            }

            return (response.assets || [])
                .slice(0, selectionLimit)
                .map(({ fileName: name, fileSize: size, type, uri }) =>
                    fileTypeGuard({ uri, size, name, type }),
                )
        }
    }

    return new NativeFileService()
}

export default createNativeFileService


export const FileService = createNativeFileService({
    imagePickerModule: ImagePicker,
    permissionModule: Permissions,
})