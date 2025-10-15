import { AppStoreLink } from '@/components/AppStoreLink'
import { Container } from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-pocket-950 stitch-top stitch-bottom text-[#ECC969] pt-0 pb-0"
    >
      <div className="py-20 sm:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-md sm:text-center">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Getting started is easy
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              It takes less than a minute to sign up. Download the app and create your first
              board of advisors. Try for free today.
            </p>
            <div className="mt-8 flex justify-center">
              <AppStoreLink color="white" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
