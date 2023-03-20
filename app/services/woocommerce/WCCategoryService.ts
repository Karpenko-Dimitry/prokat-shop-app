import ApiRequestService from './ApiRequestService';

let uriPrefix = '/products/categories'

class WCCategoryService {

    public static async list(data = {}) {
        return ApiRequestService.get(uriPrefix, data);
    }
    
    public static async read(uid: string) {
        return ApiRequestService.get(uriPrefix + uid);
    }
    
    public static async remove(uid: string) {
        return ApiRequestService._delete(uriPrefix + uid);
    }

    public static async store(data: any, headers = {}) {
        return ApiRequestService.post(uriPrefix, data, headers);
    }
    
    public static async update(uid: string, data: any) {
        return ApiRequestService.put(uriPrefix + uid, data);
    }
}

export default WCCategoryService;
