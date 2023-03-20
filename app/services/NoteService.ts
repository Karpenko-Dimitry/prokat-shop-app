import ApiRequestService from './ApiRequestService';

class NoteService {

    public static async list(data = {consumer_key: 'ck_f6472312af9b3b5a53f4a17fbe4722ff73109fd2', consumer_secret: 'cs_aa9804cfbcb2f5134f27b790e0d561e36197b6a1'}) {
        return ApiRequestService.get('', data);
    }
    
    public static async read(uid) {
        return ApiRequestService.get('/notes/' + uid);
    }
    
    public static async remove(uid) {
        return ApiRequestService._delete('/notes/' + uid);
    }

    public static async store(data, headers = {}) {
        return ApiRequestService.post('/notes', data, headers);
    }
    
    public static async update(uid, data) {
        return ApiRequestService.put('/notes/' + uid, data);
    }
}

export default NoteService;
