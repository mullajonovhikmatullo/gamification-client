import {useState} from 'react';
import {Plus, Pencil, Trash2} from 'lucide-react';
import {PageHeader} from '@/components/common/PageHeader';
import {ConfirmDialog} from '@/components/common/ConfirmDialog';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {DataTable} from "@/features/admin/components/common/DataTable.tsx";
import {useTeachersAdmin, useTeacherMutation} from "@/features/admin/pages/teachers";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";

const columns = (onModify, setDeleteId) => [
    {
        key: 'email',
        header: 'Email',
        render: (item) => <span className="font-medium">{item.email}</span>,
    },
    {
        key: 'fullName',
        header: 'To\'liq ism',
        render: (item) => <span>{item.fullName}</span>,
    },
    {
        key: 'isActive',
        header: 'Holat',
        render: (item) => (
            <span className={`text-sm ${item.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {item.isActive ? 'Faol' : 'Faol emas'}
            </span>
        ),
    },
    {
        key: 'actions',
        header: 'Amallar',
        className: 'w-32',
        render: (item) => (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8" onClick={() => onModify(item._id)}>
                    <span>
                        <Pencil className="h-4 w-4"/>
                    </span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setDeleteId(item._id)}
                >
                    <Trash2 className="h-4 w-4"/>
                </Button>
            </div>
        ),
    },
];

export default function TeacherListView({onRegister, onModify}) {
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const {teachers, teachersAreLoading, refetchTeachers} = useTeachersAdmin();
    const {mutation: {deleteTeacher}} = useTeacherMutation();

    const handleDelete = async () => {
        await deleteTeacher.mutateAsync(deleteId, {
            onSuccess: () => {
                toast.success('O\'qituvchi muvaffaqiyatli o\'chirildi');
                refetchTeachers();
                setDeleteId(null);
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="O'qituvchilar"
                description="O'qituvchilarni boshqarish"
                breadcrumbs={[{label: 'O\'qituvchilar'}]}
                actions={
                    <Button className='cursor-pointer' onClick={onRegister} asChild>
                        <span>
                            <Plus className="mr-2 h-4 w-4"/>
                            O'qituvchi qo'shish
                        </span>
                    </Button>
                }
            />

            {teachers?.length && <DataTable
                data={teachers}
                columns={columns(onModify, setDeleteId)}
                keyField="_id"
                emptyMessage="O'qituvchilar topilmadi. Birinchi o'qituvchingizni yarating!"
            />}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="O'qituvchini o'chirish"
                description="Ushbu o'qituvchini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi."
                confirmLabel="O'chirish"
                onConfirm={handleDelete}
                variant="destructive"
            />
        </AdminLayout>
    );
}
