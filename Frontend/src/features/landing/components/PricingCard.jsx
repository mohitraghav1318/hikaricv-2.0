import React from 'react';
import { Check, Ban } from 'lucide-react';
import '../pricing.scss';

const PricingCard = ({ plan }) => {
    return (
        <div className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
            {plan.isPopular && <div className="popular-badge">MOST POPULAR</div>}
            
            <div className="pricing-header">
                <h3>{plan.title}</h3>
                <p className="subtitle">{plan.subtitle}</p>
                <div className="price-container">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                </div>
            </div>

            {plan.aiHighlight && (
                <div className="ai-highlight-box">
                    <span className="ai-badge">AI POWERED</span>
                    <p>{plan.aiHighlight}</p>
                </div>
            )}

            <div className="features-list">
                {plan.features.map((feature, index) => (
                    <div key={index} className={`feature-item ${!feature.included ? 'disabled' : ''}`}>
                        {feature.included ? (
                            <Check className="icon check-icon" size={20} />
                        ) : (
                            <Ban className="icon ban-icon" size={20} />
                        )}
                        <span>{feature.text}</span>
                    </div>
                ))}
            </div>

            <button className={`button ${plan.buttonVariant === 'primary' ? 'primary-button' : 'outline-button'}`}>
                {plan.buttonText}
            </button>
        </div>
    );
};

export default PricingCard;
