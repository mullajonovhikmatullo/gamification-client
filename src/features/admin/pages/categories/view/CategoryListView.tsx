import {useState} from 'react';
import {Plus, Pencil, Trash2, Image, Eye} from 'lucide-react';
import {PageHeader} from '@/components/common/PageHeader';
import {ConfirmDialog} from '@/components/common/ConfirmDialog';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {DataTable} from "@/features/admin/components/common/DataTable.tsx";
import {useCategoriesAdmin, useCategoryMutation} from "@/features/admin/pages/categories";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";

const columns = (onModify, setDeleteId, onQuestions) => [
    {
        key: 'image',
        header: 'Rasm',
        className: 'w-20',
        render: (item) =>
            item.image ? (
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-10 w-10 rounded-lg object-cover"
                />
            ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Image className="h-5 w-5 text-muted-foreground"/>
                </div>
            ),
    },
    {
        key: 'title',
        header: 'Nomi',
        render: (item) => <span className="font-medium">{item.title}</span>,
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
        className: 'w-40',
        render: (item) => (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8" onClick={() => onQuestions(item._id)}>
                    <span>
                        <Eye className="h-4 w-4"/>
                    </span>
                </Button>
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

export default function CategoryListView({onRegister, onModify, onQuestions}) {
    //
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const {categories, categoriesAreLoading, refetchCategories} = useCategoriesAdmin();

    const {mutation: {removeCategory}} = useCategoryMutation();

    const handleDelete = async () => {
        await removeCategory.mutateAsync(deleteId, {
            onSuccess: () => {
                toast.success('Kategoriyani muvaffaqiyatli o\'chirildi');
                refetchCategories();
                setDeleteId(null);
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Kategoriyalar"
                description="Test kategoriyalarini boshqarish"
                breadcrumbs={[{label: 'Kategoriyalar'}]}
                actions={
                    <Button className='cursor-pointer' onClick={onRegister} asChild>
                        <span>
                            <Plus className="mr-2 h-4 w-4"/>
                            Kategoriya qo'shish
                        </span>
                    </Button>
                }
            />

            {categories?.length && <DataTable
                data={categories}
                columns={columns(onModify, setDeleteId, onQuestions)}
                keyField="_id"
                emptyMessage="Kategoriyalar topilmadi. Birinchi kategoriyangizni yarating!"
            />}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="Kategoriyani o'chirish"
                description="Ushbu kategoriyani o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi."
                confirmLabel="O'chirish"
                onConfirm={handleDelete}
                variant="destructive"
            />
        </AdminLayout>
    );
}
