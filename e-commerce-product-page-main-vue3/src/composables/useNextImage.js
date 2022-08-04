export function useNextImage(){
    function nextImage(activeThumbnail , productImages){
        activeThumbnail = activeThumbnail + 1
        activeThumbnail = activeThumbnail > (productImages.length - 1) ? 0 : activeThumbnail
        return activeThumbnail
    }
    return {nextImage};
}