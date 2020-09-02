import Api from "../api";

/**
 * 
 * @param { string } url 
 * @param { FormData } datas 
 */
export const customerResquest = async (url, datas) => {
    let data = {}
    try {
        const { data } = await Api.post(url, datas)
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    return data || null
}