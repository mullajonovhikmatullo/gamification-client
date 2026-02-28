import {useState} from 'react';
import {Plus, Pencil, Trash2} from 'lucide-react';
import {PageHeader} from '@/components/common/PageHeader';
import {ConfirmDialog} from '@/components/common/ConfirmDialog';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {DataTable} from "@/features/admin/components/common/DataTable.tsx";
import {useGroupsAdmin, useGroupMutation} from "@/features/admin/pages/groups";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";

const columns = (onModify, setDeleteId) => [
    {
        key: 'name',
        header: 'Guruh nomi',
        render: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
        key: 'teacher',
        header: "Ustoz",
        render: (item) => <span>{item.teacherId?.fullName || <span className='text-gray-400'>belgilanmagan</span>}</span>,
    },
    {
        key: 'studentsCount',
        header: "O'quvchilar soni",
        render: (item) => <span>{item.studentIds?.length}</span>,
    },
    {
        key: 'createdAt',
        header: 'Yaratilgan',
        render: (item) => (
            <span className="text-sm text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
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

export default function GroupListView({onRegister, onModify}) {
    //
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const {groups, groupsAreLoading, refetchGroups} = useGroupsAdmin();
    const {mutation: {deleteGroup}} = useGroupMutation();

    const handleDelete = async () => {
        await deleteGroup.mutateAsync(deleteId, {
            onSuccess: () => {
                toast.success('Guruh muvaffaqiyatli o\'chirildi');
                refetchGroups();
                setDeleteId(null);
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    console.log(groups)

    return (
        <AdminLayout>
            <PageHeader
                title="Guruhlar"
                description="O'quv guruhlarini boshqarish"
                breadcrumbs={[{label: 'Guruhlar'}]}
                actions={
                    <Button className='cursor-pointer' onClick={onRegister} asChild>
                        <span>
                            <Plus className="mr-2 h-4 w-4"/>
                            Guruh qo'shish
                        </span>
                    </Button>
                }
            />

            {groups?.length && <DataTable
                data={groups}
                columns={columns(onModify, setDeleteId)}
                keyField="_id"
                emptyMessage="Guruhlar topilmadi. Birinchi guruhingizni yarating!"
            />}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="Guruhni o'chirish"
                description="Ushbu guruhni o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi."
                confirmLabel="O'chirish"
                onConfirm={handleDelete}
                variant="destructive"
            />
        </AdminLayout>
    );
}
