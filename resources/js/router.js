import VueRouter      from 'vue-router'
// Pages
import Home           from './pages/Home'
import Register       from './pages/Register'
import Login          from './pages/Login'
import Dashboard      from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword  from "./pages/ResetPassword";

// Routes
const routes = [
    {
        path      : '/',
        name      : 'home',
        component : Home,
        meta      : {
            auth : undefined
        }
    },
    {
        path      : '/register',
        name      : 'register',
        component : Register,
        meta      : {
            auth : false
        }
    },
    {
        path      : '/login',
        name      : 'login',
        component : Login,
        props     : true,
        meta      : {
            auth : false
        }
    },
    {
        path      : '/reset-password',
        name      : 'reset-password',
        component : ForgotPassword,
        meta      : {
            auth : false
        }
    },
    {
        path      : '/reset-password/:token',
        name      : 'reset-password-form',
        component : ResetPassword,
        meta      : {
            auth : false
        }
    },
    // USER ROUTES
    {
        path      : '/dashboard',
        name      : 'dashboard',
        component : Dashboard,
        meta      : {
            auth : true
        }
    },
    // ADMIN ROUTES
    {
        path      : '/admin',
        name      : 'admin.dashboard',
        component : AdminDashboard,
        meta      : {
            auth : {roles : 2, redirect : {name : 'login'}, forbiddenRedirect : '/403'}
        }
    },
]
const router = new VueRouter({
    history : true,
    mode    : 'history',
    routes,
})
export default router
