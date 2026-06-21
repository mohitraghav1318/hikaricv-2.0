import React from 'react';
import { useInterview } from '../features/interview/hooks/useInterview';
import { Sparkles, X } from 'lucide-react';
import './FeatureModal.scss';

const FeatureModal = () => {
    const { isFeatureModalOpen, setIsFeatureModalOpen } = useInterview();

    if (!isFeatureModalOpen) return null;

    return (
        <div className="feature-modal-overlay" onClick={() => setIsFeatureModalOpen(false)}>
            <div className="feature-modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="feature-modal-close" onClick={() => setIsFeatureModalOpen(false)}>
                    <X size={18} />
                </button>
                <div className="feature-modal-icon-container">
                    <div className="feature-modal-icon-glow"></div>
                    <div className="feature-modal-icon">
                        <Sparkles size={32} />
                    </div>
                </div>
                <div className="feature-modal-body">
                    <h2>Feature Under Construction</h2>
                    <p>
                        Our AI agents are currently architecting this module to give you the ultimate personalized preparation experience. Stay tuned!
                    </p>
                </div>
                <div className="feature-modal-actions">
                    <button className="feature-modal-btn" onClick={() => setIsFeatureModalOpen(false)}>
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureModal;
