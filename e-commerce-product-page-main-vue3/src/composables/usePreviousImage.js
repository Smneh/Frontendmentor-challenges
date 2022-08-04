export function usePreviousImage(){
    function previousImage(activeThumbnail , productImages){
        activeThumbnail = activeThumbnail - 1
        activeThumbnail = activeThumbnail < 0 ? (productImages.length - 1) : activeThumbnail
        return activeThumbnail
    }
    return {previousImage};
}
