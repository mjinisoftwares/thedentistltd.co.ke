'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { CheckCircle2, Loader2 } from 'lucide-react'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  image?: Media | number
  imageAlt?: string
  title?: string
  description?: string
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    image,
    imageAlt,
    title,
    description,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string }>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>

      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 800)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })

          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Something went wrong.',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch {
          setIsLoading(false)
          setError({ message: 'Unexpected error occurred.' })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <section className="relative pb-24 pt-12">
      <div className="container">
        <div
          className={cn(
            'mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-background shadow-xl transition-all duration-500',
            'hover:shadow-2xl hover:-translate-y-1',
          )}
        >
          <div className="grid lg:grid-cols-2">
            {/* LEFT — Image with Luxury Effects */}
            <div className="group relative hidden lg:block overflow-hidden">
              {image && typeof image === 'object' && image.url ? (
                <Image
                  src={image.url}
                  alt={imageAlt || image.alt || title || 'Form Image'}
                  width={image.width || 1200}
                  height={image.height || 1200}
                  className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Upload image in CMS</p>
                </div>
              )}

              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent" />
            </div>

            {/* RIGHT — Form Panel */}
            <div className="relative p-10 md:p-14">
              {/* Decorative Accent Line */}
              <div className="mb-6 h-1 w-16 rounded-full bg-primary" />

              {/* Section Header */}
              {(title || description) && (
                <div className="mb-8 space-y-3">
                  {title && (
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
                  )}
                </div>
              )}

              {/* Intro */}
              {enableIntro && introContent && !hasSubmitted && (
                <div className="mb-10 animate-in fade-in duration-700">
                  <RichText
                    data={introContent}
                    enableGutter={false}
                    className="prose max-w-none dark:prose-invert"
                  />
                </div>
              )}

              <FormProvider {...formMethods}>
                {/* SUCCESS STATE */}
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <div className="py-16 text-center animate-in fade-in zoom-in-95 duration-500">
                    <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-500" />
                    <RichText
                      data={confirmationMessage}
                      className="prose max-w-none dark:prose-invert"
                    />
                  </div>
                )}

                {/* LOADING STATE */}
                {isLoading && !hasSubmitted && (
                  <div className="py-20 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground font-medium">Processing your request...</p>
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in">
                    {error.status || '500'}: {error.message}
                  </div>
                )}

                {/* FORM */}
                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                    {formFromProps?.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]

                      if (!Field) return null

                      return (
                        <div
                          key={index}
                          className="transition-all duration-300 focus-within:scale-[1.01]"
                        >
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    })}

                    {/* PREMIUM BUTTON */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className={cn(
                          'w-full rounded-full text-base font-medium transition-all duration-300',
                          'hover:scale-[1.02] active:scale-[0.98]',
                        )}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          submitButtonLabel || 'Book Appointment'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
