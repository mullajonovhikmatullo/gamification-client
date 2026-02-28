import {RouteObject, Outlet} from "react-router-dom";
import Dashboard from "@/features/admin/pages/Dashboard";

// Categories
import {CategoryListPage, CategoryModifyPage, CategoryRegisterPage} from "@/features/admin/pages/categories";

// Quizzes
import {QuizListPage, QuizModifyPage, QuizRegisterPage} from "@/features/admin/pages/quizzes";

// Questions
import {QuestionListPage, QuestionModifyPage, QuestionRegisterPage} from "@/features/admin/pages/questions";

// Users
import {UserListPage, UserModifyPage, UserRegisterPage} from "@/features/admin/pages/students";

// Teachers
import {TeacherListPage, TeacherModifyPage, TeacherRegisterPage} from "@/features/admin/pages/teachers";

// Groups
import {GroupListPage, GroupModifyPage, GroupRegisterPage} from "@/features/admin/pages/groups";

export const adminRouter: RouteObject = {
    path: "/admin",
    element: <Outlet/>,
    children: [
        {
            index: true,
            element: <Dashboard/>,
        },

        {
            path: "categories",
            children: [
                {index: true, element: <CategoryListPage/>},
                {path: "register", element: <CategoryRegisterPage/>},
                {path: "modify", element: <CategoryModifyPage/>},
            ],
        },

        {
            path: "quizzes",
            children: [
                {index: true, element: <QuizListPage/>},
                {path: "register", element: <QuizRegisterPage/>},
                {path: "modify", element: <QuizModifyPage/>},
                // {path: "view/:id", element: <QuizForm/>},
            ],
        },

        {
            path: "categories/questions",
            children: [
                {index: true, element: <QuestionListPage/>},
                {path: "register", element: <QuestionRegisterPage/>},
                {path: "modify", element: <QuestionModifyPage/>},
            ],
        },

        {
            path: "users",
            children: [
                {index: true, element: <UserListPage/>},
                {path: "register", element: <UserRegisterPage/>},
                {path: "modify", element: <UserModifyPage/>},
            ],
        },

        {
            path: "teachers",
            children: [
                {index: true, element: <TeacherListPage/>},
                {path: "register", element: <TeacherRegisterPage/>},
                {path: "modify", element: <TeacherModifyPage/>},
            ],
        },

        {
            path: "groups",
            children: [
                {index: true, element: <GroupListPage/>},
                {path: "register", element: <GroupRegisterPage/>},
                {path: "modify", element: <GroupModifyPage/>},
            ],
        },
    ],
};
