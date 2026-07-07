import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactMap } from '@/features/contact/ContactMap';
import { fadeUp, staggerChildren } from '@/animations/motion';

const CONTACT_ROWS = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Kharadi 57, Kharadi, Pune, Maharashtra 411014',
  },
  { icon: Phone, label: 'Phone', value: '+91 20 XXXX XXXX' },
  { icon: Mail, label: 'Email', value: 'sales@krahejacorp.com' },
  { icon: Globe, label: 'Website', value: 'www.krahejacorp.com' },
];

export default function ContactPage() {
  return (
    <div className="grid min-h-full grid-cols-1 lg:h-full lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-14 lg:py-20 lg:pl-20 lg:pr-24">
        <PageHeader eyebrow="Contact" title="Get in Touch" />

        <motion.div
          variants={staggerChildren(0.08)}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col divide-y divide-hairline border-y border-hairline sm:mt-10 lg:mt-14"
        >
          {CONTACT_ROWS.map((row) => (
            <motion.div key={row.label} variants={fadeUp} className="flex items-center gap-4 py-4 sm:gap-5 sm:py-5">
              <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-blue sm:h-10 sm:w-10">
                <row.icon size={16} strokeWidth={1.6} />
              </span>
              <div>
                <div className="label-caps text-ink-muted">{row.label}</div>
                <div className="mt-1 text-sm text-ink sm:text-[1.0625rem]">{row.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex items-center gap-6 sm:mt-12 sm:gap-8"
        >
          <div className="glass-soft flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl sm:h-28 sm:w-28">
            <div
              className="h-14 w-14 opacity-80 sm:h-20 sm:w-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23fff'/%3E%3Cg fill='%23111'%3E%3Crect x='4' y='4' width='24' height='24'/%3E%3Crect x='72' y='4' width='24' height='24'/%3E%3Crect x='4' y='72' width='24' height='24'/%3E%3Crect x='10' y='10' width='12' height='12' fill='%23fff'/%3E%3Crect x='78' y='10' width='12' height='12' fill='%23fff'/%3E%3Crect x='10' y='78' width='12' height='12' fill='%23fff'/%3E%3Crect x='36' y='4' width='6' height='6'/%3E%3Crect x='48' y='4' width='6' height='6'/%3E%3Crect x='36' y='16' width='6' height='6'/%3E%3Crect x='60' y='16' width='6' height='6'/%3E%3Crect x='36' y='36' width='6' height='6'/%3E%3Crect x='48' y='36' width='6' height='6'/%3E%3Crect x='60' y='36' width='6' height='6'/%3E%3Crect x='72' y='36' width='6' height='6'/%3E%3Crect x='84' y='36' width='6' height='6'/%3E%3Crect x='4' y='48' width='6' height='6'/%3E%3Crect x='16' y='48' width='6' height='6'/%3E%3Crect x='36' y='48' width='6' height='6'/%3E%3Crect x='60' y='48' width='6' height='6'/%3E%3Crect x='84' y='48' width='6' height='6'/%3E%3Crect x='36' y='60' width='6' height='6'/%3E%3Crect x='48' y='60' width='6' height='6'/%3E%3Crect x='72' y='60' width='6' height='6'/%3E%3Crect x='36' y='72' width='6' height='6'/%3E%3Crect x='60' y='72' width='6' height='6'/%3E%3Crect x='84' y='72' width='6' height='6'/%3E%3Crect x='48' y='84' width='6' height='6'/%3E%3Crect x='72' y='84' width='6' height='6'/%3E%3Crect x='84' y='84' width='6' height='6'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
          <p className="max-w-[160px] text-xs leading-relaxed text-ink-muted sm:text-sm">
            Scan to save Kharadi 57 contact details to your phone.
          </p>
        </motion.div>
      </div>

      <div className="relative h-56 w-full sm:h-72 lg:h-full">
        <ContactMap />
      </div>
    </div>
  );
}
