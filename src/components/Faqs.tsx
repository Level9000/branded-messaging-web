import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'What is Pocket Panel?',
      answer:
        'Pocket Panel is your personal boardroom in your pocket.  An AI-powered business companion that helps you turn ideas into action with expert guidance, planning tools, and strategic coaching.',
    },
    {
      question: 'Who is Pocket Panel for?',
      answer:
        'Whether you’re a student launching a side project, a solo founder starting your first business, or a working professional exploring new opportunities, Pocket Panel is built to support your journey from idea to execution.',
    },
    {
      question: 'How does the AI Board of Advisors work?',
      answer:
        'Tell us about your idea and your goals, and we’ll assemble a custom panel of AI advisors with different areas of expertise. These advisors guide you with personalized insights, feedback, and action items to keep you moving forward.',
    },
  ],
  [
    {
      question: 'What do I get with the free plan?',
      answer:
        'The free plan gives you full access to your AI board, 1:1 strategy sessions with advisors, and one business profile. It’s perfect for exploring your idea or starting your journey without pressure.',
    },
    {
      question: 'What’s included in the Pro plan?',
      answer:
        'Pro gives you everything in the free plan, plus access to board meetings, multi-agent focus groups, and professional coaching. It’s designed for those who are ready to move faster and go further.',
    },
    {
      question: 'Is this for real businesses or just ideas?',
      answer:
        'Both. Whether you’re still brainstorming or already onboarding your first customers, Pocket Panel helps you validate, build, and grow a real, sustainable business.',
    },
  ],
  [
    {
      question: 'Can I upgrade or cancel anytime?',
      answer:
        'Yes. You can upgrade, downgrade, or cancel your plan at any time directly in the app. No hidden fees or lock-in contracts.',
    },
    {
      question: 'How does coaching and mentorship work?',
      answer:
        'Professional coaches are AI personas with skillsets designed to help you grow in specific areas.  Think of these as skill development coaches.  They help you grow your professional toolbox in areas that will help you become a better leader.',
    },
    {
      question: 'What if I need help?',
      answer:
        'We have various support channels you can leverage.  Whether you prefer YouTube tutorials, Discord communities, or traditional email, Pocket Panel has you covered.',
    },
  ],
]

// Flatten to 2 balanced columns
const allFaqs = faqs.flat()
const splitIndex = Math.ceil(allFaqs.length / 2)
const twoColFaqs = [allFaqs.slice(0, splitIndex), allFaqs.slice(splitIndex)]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="stitch-top text-[#ECC969] pt-0 pb-0"
    >
      <div className="py-16 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl lg:mx-0">
            <h2
              id="faqs-title"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900"
            >
              Frequently asked questions
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-gray-700">
              If you have anything else you want to ask,{' '}
              <a
                href="mailto:support@pocketpanel.ai"
                className="text-gray-900 underline"
              >
                reach out to us
              </a>
              .
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-12 sm:mt-20 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2"
          >
            {twoColFaqs.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul role="list" className="space-y-8 sm:space-y-10">
                  {column.map((faq, faqIndex) => (
                    <li key={faqIndex}>
                      <h3 className="text-2xl sm:text-lg font-semibold text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                      <p className="mt-3 sm:mt-4 text-base sm:text-sm leading-relaxed text-gray-700">
                        {faq.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
