INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Animated Button',
    'animated-button',
    'Gradient kenarlıklı, hover animasyonlu modern bir buton bileşeni.',
    'Buttons',
    'animated-button',
    'export function AnimatedButton() {
  return (
    <button className="animated-btn">
      Get Started
    </button>
  );
}',
    '.animated-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.animated-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
}',
    TRUE
);

INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Pricing Card',
    'pricing-card',
    'Plan özelliklerini ve fiyatı gösteren şık bir kart bileşeni.',
    'Cards',
    'pricing-card',
    'export function PricingCard() {
  return (
    <div className="pricing-card">
      <h3>Pro Plan</h3>
      <p className="price">$29/mo</p>
      <ul>
        <li>Unlimited projects</li>
        <li>Priority support</li>
      </ul>
      <button>Subscribe</button>
    </div>
  );
}',
    '.pricing-card {
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
}',
    TRUE
);
