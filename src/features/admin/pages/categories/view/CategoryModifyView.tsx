import { useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Image, Upload, Loader2 } from 'lucide-react';
import { AdminLayout } from "@/features/admin/components/layout/AdminLayout.tsx";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCategoryAdmin, useCategoryMutation } from "@/features/admin/pages/categories";
import { ToastHelper } from "@/features/api/errorHandler.ts";
import { AxiosError } from "axios";
import { CategoryModifyRequest } from "@/features";

interface CategoryModifyViewProps {
  onList: () => void;
  categoryId: string;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Nomi kiritilishi shart')
    .min(3, 'Nomi kamida 3 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Nomi 100 ta belgidan oshmasligi kerak'),
  image: yup
    .string()
    .transform((value) => value || undefined)
    .url('To\'g\'ri URL manzilini kiriting')
    .optional(),
  isActive: yup
    .boolean()
    .default(true)
});

export function CategoryModifyView({ onList, categoryId }: CategoryModifyViewProps) {
  //
  const { category, categoryIsLoading } = useCategoryAdmin(categoryId);
  const { mutation: { modifyCategory } } = useCategoryMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CategoryModifyRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      image: '',
      isActive: category?.isActive
    }
  });

  const imageUrl = watch('image');

  // Reset form when category data is loaded
  useEffect(() => {
    if (category) {
      reset({
        title: category.title || '',
        image: category.image || '',
        isActive: category.isActive ?? true
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: CategoryModifyRequest) => {
    await modifyCategory.mutateAsync(
      { category: data, id: categoryId },
      {
        onSuccess: () => {
          toast.success('Kategoriya muvaffaqiyatli yangilandi');
          onList();
        },
        onError: (error: AxiosError) => ToastHelper(error)
      }
    );
  };

  if (categoryIsLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  if (!category) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Kategoriya topilmadi</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Kategoriyani tahrirlash"
        description="Kategoriya ma'lumotlarini yangilash"
      />

      <Card className="max-w-2xl shadow-card">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Nomi *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Kategoriya nomini kiriting"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Rasm URL (ixtiyoriy)</Label>
              <div className="flex gap-3">
                <Input
                  id="image"
                  {...register('image')}
                  placeholder="Rasm URL manzilini kiriting"
                  className={errors.image ? 'border-destructive flex-1' : 'flex-1'}
                />
                <Button type="button" variant="outline" className="shrink-0">
                  <Upload className="mr-2 h-4 w-4" />
                  Yuklash
                </Button>
              </div>
              {errors.image && (
                <p className="text-sm text-destructive">{errors.image.message}</p>
              )}
            </div>

            {/* Image Preview */}
            <div className="space-y-2">
              <Label>Ko'rinish</Label>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Kategoriya ko'rinishi"
                  className="h-32 w-32 rounded-lg object-cover border"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-base">Faol holat</Label>
                <p className="text-sm text-muted-foreground">
                  Kategoriya tizimda faol bo'lishi kerakmi?
                </p>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Yuklanmoqda...' : 'Kategoriyani yangilash'}
              </Button>
              <Button type="button" variant="outline" onClick={onList} disabled={isSubmitting}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
