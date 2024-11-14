import { createWebHistory, createRouter } from "vue-router";

//route cho trang chủ
import BookHome from "@/views/Book_Home.vue";
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";

//route cho Book
import AddBook from "@/views/AddBook.vue";
import ListBook from "@/views/ListBook.vue";
import BookDetails from "@/views/BookDetails.vue";
//route cho Nhà Xuất Bản
import AddNXB from "@/views/AddNXB.vue";
import ListNXB from "@/views/ListNXB.vue";
import NXBDetails from "@/views/NXBDetails.vue";
//route cho Nhân Viên
import ListNhanVien from "@/views/ListNhanVien.vue";
import AddNhanVien from "@/views/AddNhanVien.vue";


const routes = [
    {
        path: "/",
        name: "contactbook",
        component: BookHome,
    },
    {
        path: "/login",
        name: "book.login",
        component: LogIn,
    },
    {
        path: "/signup",
        name: "book.signup",
        component: SignUp,
    },
    {
        path: "/addbook",
        name: "book.add",
        component: AddBook,
    },
    {
        path: "/listbook",
        name: "book.list",
        component: ListBook,
    },
    {
        path: "/listnxb",
        name: "nxb.list",
        component: ListNXB,
    },
    {
        path: "/addnxb",
        name: "nxb.add",
        component: AddNXB,
    },
    {
        path: "/listnhanvien",
        name: "nhanvien.list",
        component: ListNhanVien,
    },
    {
        path: "/addnhanvien",
        name: "nhanvien.add",
        component: AddNhanVien,
    },
    {
        path: '/books/:id',
        name: 'book.details',
        component: BookDetails, // Make sure this is the component for book details view
        props: true // Allows route params to be passed as props
    },
    {
        path: '/nxb/:id',
        name: 'nxb.details',
        component: NXBDetails, // Make sure this is the component for book details view
        props: true // Allows route params to be passed as props
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;