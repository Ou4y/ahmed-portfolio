import { useState } from 'react'
import faqs from '../../data/faqs.js'
import Container from '../ui/Container.jsx'
import FAQItem from '../ui/FAQItem.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

function FAQ({ language, t }) {
  const [openItem, setOpenItem] = useState(faqs.en[0].id)

  return (
    <section className="bg-cream py-24 sm:py-28 lg:py-36" id="faq">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <SectionTitle
              description={t.faq.description}
              eyebrow={t.faq.eyebrow}
              title={t.faq.title}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              {faqs[language].map((item) => (
                <FAQItem
                  answer={item.answer}
                  id={item.id}
                  isOpen={openItem === item.id}
                  key={item.id}
                  onToggle={() =>
                    setOpenItem((currentItem) =>
                      currentItem === item.id ? null : item.id,
                    )
                  }
                  question={item.question}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default FAQ
