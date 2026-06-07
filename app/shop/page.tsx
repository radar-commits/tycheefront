import Link from 'next/link';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Shop — Coming soon | tychee',
  description: 'The tychee store is coming soon. Sign up to be notified.',
};

export default function ShopPage() {
  return (
    <>
      <main className="coming-soon">
      <span className="coming-soon__label">Shop</span>
      <h1 className="coming-soon__title">Coming soon</h1>
      <p className="coming-soon__text">
        The tychee store is on its way. Drop your email and we&apos;ll let you
        know the moment it&apos;s live.
      </p>

      <form
        className="notify-form"
        action="https://formsubmit.co/tycheemail@pm.me"
        method="POST"
      >
        {/* FormSubmit configuration */}
        <input type="hidden" name="_subject" value="New shop notify signup" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://tychee.xyz" />

        <input
          className="notify-form__input"
          type="email"
          name="email"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
        <button className="notify-form__btn" type="submit">
          Notify me
        </button>
      </form>

      <Link href="/" className="coming-soon__back">
        ← Back home
      </Link>
      </main>
    </>
  );
}
