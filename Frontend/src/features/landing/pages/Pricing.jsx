import PricingCard from "../components/PricingCard";
import { pricingPlans } from "../data/pricingData";
import '../pricing.scss';

const Pricing = () => {
    return (
        <><div className="pricing-page">
                <div className="pricing-container">
                    <div className="pricing-header-text">
                        <h2>Choose Your Growth Path</h2>
                        <p>Precision-engineered tools to transform your interview performance. From basics to elite coaching.</p>
                    </div>
                    
                    <div className="pricing-cards-wrapper">
                        {pricingPlans.map((plan) => (
                            <PricingCard key={plan.id} plan={plan} />
                        ))}
                    </div>
                </div>
            </div></>
    )
}

export default Pricing