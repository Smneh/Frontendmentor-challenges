export function useGetUrl(){
    function getImgUrl(image) {
        return require( `../assets/` + image )
    }
    return {getImgUrl};
}