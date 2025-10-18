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
              Visit our interactive portal to experience White Glove Chat for yourself.  Demo the customer experience
              for yourself and see why White Glove Chat is becoming the branded messaging solution of choice for small business
              owners.
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
