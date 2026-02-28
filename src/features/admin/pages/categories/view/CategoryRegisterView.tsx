import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Image, Upload } from 'lucide-react';
import { AdminLayout } from "@/features/admin/components/layout/AdminLayout.tsx";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCategoryMutation } from "@/features/admin/pages/categories";
import { ToastHelper } from "@/features/api/errorHandler.ts";
import { AxiosError } from "axios";
import {CategoryCreateRequest} from "@/features";

interface CategoryRegisterViewProps {
  onBack: () => void;
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

export function CategoryRegisterView({ onBack }: CategoryRegisterViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting }
  } = useForm<CategoryCreateRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      image: '',
      isActive: true
    }
  });

  const { mutation: { registerCategory } } = useCategoryMutation();
  const imageUrl = watch('image');

  const onSubmit = async (data: CategoryCreateRequest) => {
    await registerCategory.mutateAsync(data, {
      onSuccess: () => {
        toast.success('Kategoriya muvaffaqiyatli yaratildi');
        onBack();
      },
      onError: (error: AxiosError) => ToastHelper(error)
    });
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Kategoriya yaratish"
        description="Yangi test kategoriyasini qo'shish"
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
                {isSubmitting ? 'Yuklanmoqda...' : 'Kategoriya yaratish'}
              </Button>
              <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
