import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Crown, Lock, Globe, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'Instant Multi-Chain Transfers',
      description: 'TRC20 and ERC20 funds are credited instantly after one network confirmation.',
      gradient: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-500',
    },
    {
      icon: Crown,
      title: 'Exclusive VIP Tiers',
      description: 'Unlock elite benefits with Gold, Diamond, and Platinum tiers across all networks.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
    },
    {
      icon: Sparkles,
      title: 'High-Yield Passive Earnings',
      description: 'Earn rewards through our staking programs tailored for long-term growth.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
    },
  ];

  const securityFeatures = [
    {
      icon: Globe,
      title: 'Dual-Network Infrastructure',
      description: 'Supporting secure and efficient transactions across both Tron and Ethereum blockchains.',
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Military-grade encryption protects all your transactions.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <motion.span 
            className="text-xl font-bold text-foreground tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ZytroPay
          </motion.span>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isAuthenticated ? (
              <Link 
                to="/dashboard"
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              ZytroPay
              <br />
              <span className="text-primary">The Ultimate Dual-Network USDT Gateway.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Secure, Fast, and Global elite transfers. Experience the power of TRC20 and ERC20 in one professional environment.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isAuthenticated ? (
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <Link to="/login">
                  <motion.button
                    className="w-full sm:w-auto px-8 py-3.5 border border-primary/50 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-32 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 right-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Choose <span className="text-primary">ZytroPay</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              The most trusted platform for USDT transactions with exclusive benefits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-5 hover:border-primary/30 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 px-4 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Bank-Grade Security
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Your assets are protected by military-grade encryption and end-to-end security measures. Experience peace of mind with our industry-leading protocol.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-5 flex items-start gap-3"
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass-card p-8 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Join thousands of users who trust ZytroPay for their professional USDT transactions.
              </p>
              <motion.button
                onClick={handleGetStarted}
                className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 mx-auto hover:shadow-lg hover:shadow-primary/25 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-lg font-bold text-foreground">ZytroPay</span>
          <p className="text-xs text-muted-foreground mt-1">
            © 2026 ZytroPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
