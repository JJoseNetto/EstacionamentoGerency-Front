import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAssociarViaCode } from "@/api/hooks"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"

type FormData = {
  codigo: string
}

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const associarViaCodeMutation = useAssociarViaCode()

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { codigo: "" },
  })

  const onSubmit = (data: FormData) => {
    associarViaCodeMutation.mutate(
      data.codigo,
      {
        onSuccess: () => {
          toast.success("Código validado com sucesso!")
          reset()
        },
        onError: (err: any) => {
          toast.error("Erro ao validar código!", {
            description: err?.response?.data?.message ?? "Tente novamente.",
          })
        },
      }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
            </div>
            <h1 className="text-xl font-bold">Adicione o Código</h1>
            <FieldDescription>
              Coloque o código que foi enviado para você para visualizar o estacionamento
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="otp" className="sr-only">
              Código de verificação
            </FieldLabel>

            <Controller
              control={control}
              name="codigo"
              render={({ field }) => (
                <InputOTP
                  id="otp"
                  maxLength={6}
                  required
                  containerClassName="gap-4"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </Field>

          <Field>
            <Button
              type="submit"
              disabled={associarViaCodeMutation.isPending}
            >
              {associarViaCodeMutation.isPending ? "Verificando..." : "Verificar"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
