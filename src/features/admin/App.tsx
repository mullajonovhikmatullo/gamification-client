import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import CategoryList from "./pages/categories/CategoryList";
import CategoryForm from "./pages/categories/CategoryForm";
import QuizList from "./pages/quizzes/QuizList";
import QuizForm from "./pages/quizzes/QuizForm";
import QuestionList from "./pages/questions/QuestionList";
import QuestionForm from "./pages/questions/QuestionForm";
import UserList from "@/features/admin/pages/students/UserList";
import UserForm from "@/features/admin/pages/students/UserForm";
import TeacherList from "./pages/teachers/TeacherList";
import TeacherForm from "./pages/teachers/TeacherForm";
import GroupList from "./pages/groups/GroupList";
import GroupForm from "./pages/groups/GroupForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    {/* Dashboard */}
                    <Route path="/" element={<Dashboard />} />

                    {/* Categories */}
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/create" element={<CategoryForm />} />
                    <Route path="/categories/edit/:id" element={<CategoryForm />} />

                    {/* Quizzes */}
                    <Route path="/quizzes" element={<QuizList />} />
                    <Route path="/quizzes/create" element={<QuizForm />} />
                    <Route path="/quizzes/edit/:id" element={<QuizForm />} />
                    <Route path="/quizzes/view/:id" element={<QuizForm />} />

                    {/* Questions */}
                    <Route path="/questions" element={<QuestionList />} />
                    <Route path="/questions/create" element={<QuestionForm />} />
                    <Route path="/questions/edit/:id" element={<QuestionForm />} />

                    {/* Users */}
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/create" element={<UserForm />} />
                    <Route path="/users/edit/:id" element={<UserForm />} />

                    {/* Teachers */}
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/teachers/create" element={<TeacherForm />} />
                    <Route path="/teachers/edit/:id" element={<TeacherForm />} />

                    {/* Groups */}
                    <Route path="/groups" element={<GroupList />} />
                    <Route path="/groups/create" element={<GroupForm />} />
                    <Route path="/groups/edit/:id" element={<GroupForm />} />

                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
