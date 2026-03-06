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

  const router = useRouter()

  const formMethods = useForm({
    mode: 'onBlur',
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | null>(null)

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (isLoading) return

      setError(null)
      setIsLoading(true)

      try {
        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        /* SAVE TO PAYLOAD */
        await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
        })

        /* SEND EMAIL (APPOINTMENT) */
        await fetch(`${getClientSideURL()}/api/book-appointment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionData: dataToSend,
          }),
        })

        setHasSubmitted(true)
        reset()

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (err) {
        console.error(err)

        setError({
          message: 'Something went wrong. Please try again.',
          status: '500',
        })
      } finally {
        setIsLoading(false)
      }
    },
    [formID, redirect, confirmationType, router, isLoading, reset],
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
            {/* LEFT IMAGE */}
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
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Upload image in CMS</p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent" />
            </div>

            {/* FORM PANEL */}
            <div className="relative p-10 md:p-14">
              <div className="mb-6 h-1 w-16 rounded-full bg-primary" />

              {(title || description) && (
                <div className="mb-8 space-y-3">
                  {title && (
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
                  )}
                  {description && <p className="text-muted-foreground">{description}</p>}
                </div>
              )}

              {enableIntro && introContent && !hasSubmitted && (
                <div className="mb-10">
                  <RichText
                    data={introContent}
                    enableGutter={false}
                    className="prose max-w-none dark:prose-invert"
                  />
                </div>
              )}

              <FormProvider {...formMethods}>
                {/* SUCCESS */}
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <div className="animate-in fade-in zoom-in-95 py-16 text-center">
                    <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-500" />
                    <RichText
                      data={confirmationMessage}
                      className="prose max-w-none dark:prose-invert"
                    />
                  </div>
                )}

                {/* LOADING */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Processing your request...</p>
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error.status}: {error.message}
                  </div>
                )}

                {/* FORM */}
                {!hasSubmitted && !isLoading && (
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

                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full rounded-full text-base font-medium transition-all hover:scale-[1.02]"
                      >
                        {submitButtonLabel || 'Book Appointment'}
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
