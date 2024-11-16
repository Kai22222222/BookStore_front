import { createWebHistory, createRouter } from "vue-router";

//route cho trang chủ
import BookHome from "@/views/Book_Home.vue";
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";
import SignUpForAdmin from "@/views/SignUpForAdmin.vue";
import AccountDetails from "@/views/AccountDetails.vue";
import AboutUs from "@/views/AboutUs.vue";
//route cho Book
import AddBook from "@/views/AddBook.vue";
import ListBook from "@/views/ListBook.vue";
import BookDetails from "@/views/BookDetails.vue";
import BookEdit from "@/views/BookEdit.vue";
//route cho Nhà Xuất Bản
import AddNXB from "@/views/AddNXB.vue";
import ListNXB from "@/views/ListNXB.vue";
import NXBDetails from "@/views/NXBDetails.vue";
import NXBEdit from "@/views/EditNXB.vue";
//route cho Nhân Viên
import ListNhanVien from "@/views/ListNhanVien.vue";
import AddNhanVien from "@/views/AddNhanVien.vue";
import ListAccount from "@/views/ListAccount.vue";
import EditAccount from "@/views/EditAccount.vue";
////route cho lịch sử Mượn Sách
import BorrowBook from "@/views/BorrowBook.vue";
const routes = [
    {
        path: "/",
        name: "contactbook",
        component: BookHome,
    },
    {
        path: "/about",
        name: "about",
        component: AboutUs,
    },
    {
        path: "/borrow",
        name: "borrow",
        component: BorrowBook,
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
        path: "/admin/signup",
        name: "admin.signup",
        component: SignUpForAdmin,
    },
    {
        path: "/addbook",
        name: "book.add",
        component: AddBook,
    },
    {
        path: "/books/edit/:id",
        name: "book.edit",
        component: BookEdit,
    },
    {
        path: "/listbook",
        name: "book.list",
        component: ListBook,
    },
    {
        path: "/listaccount",
        name: "account.list",
        component: ListAccount,
    },
    {
        path: "/edit/account/:id",
        name: "account.edit",
        component: EditAccount,
    },
    {
        path: "/account/:id",
        name: "account.details",
        component: AccountDetails,
        props: true,
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
        path: "/nxb/edit/:id",
        name: "nxb.edit",
        component: NXBEdit,
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