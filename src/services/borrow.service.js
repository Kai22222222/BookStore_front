import axios from "axios";

const API_URL = "http://localhost:3002/api/borrow"; // Địa chỉ API để lưu thông tin mượn sách

class BorrowService {
    async borrow(data) {
        return axios.post(API_URL, data);
    }
}

export default new BorrowService();