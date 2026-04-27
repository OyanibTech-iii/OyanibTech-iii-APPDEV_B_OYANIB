import React from 'react';
import {View,Text,ScrollView,StyleSheet,Linking,} from 'react-native';
import CustomFooter from '../components/CustomFooter';

const TermsPolicy = () => {

  const effectiveDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const openEmail = () => {
    Linking.openURL('mailto:growficooffical@gmail.com');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* Title */}
      <Text style={styles.title}>
        Terms and Conditions
      </Text>

      {/* Effective Date */}
      <Text style={styles.date}>
        Effective date: <Text style={styles.dateHighlight}>{effectiveDate}</Text>
      </Text>

      {/* Intro */}
      <Text style={styles.paragraph}>
        Welcome to Growfico. These Terms and Conditions ("Terms") govern your
        access to and use of our website, products, and services
        (collectively, the "Services"). By accessing or using the Services,
        you agree to be bound by these Terms.
      </Text>

      {/* Section 1 */}
      <Text style={styles.heading}>1. Eligibility</Text>
      <Text style={styles.paragraph}>
        You must be at least 18 years old, or the age of majority in your
        jurisdiction, to use the Services. By using the Services, you represent
        and warrant that you meet this requirement.
      </Text>

      {/* Section 2 */}
      <Text style={styles.heading}>2. Accounts and Security</Text>
      <Text style={styles.paragraph}>
        When you create an account, you agree to provide accurate, current,
        and complete information. You are responsible for maintaining the
        confidentiality of your credentials and for all activities that occur
        under your account.
      </Text>

      {/* Section 3 */}
      <Text style={styles.heading}>3. Orders, Pricing, and Payments</Text>
      <Text style={styles.paragraph}>
        All prices are subject to change without notice. By placing an order,
        you authorize us and our payment processors to charge your payment
        method.
      </Text>

      {/* Section 4 */}
      <Text style={styles.heading}>4. Shipping, Returns, and Refunds</Text>
      <Text style={styles.paragraph}>
        Shipping times and costs are provided during checkout and may vary.
        Items must meet stated requirements to qualify for return or refund.
      </Text>

      {/* Section 5 */}
      <Text style={styles.heading}>5. Acceptable Use</Text>
      <Text style={styles.paragraph}>
        You agree not to misuse the Services, including violating laws,
        infringing intellectual property, or attempting unauthorized access.
      </Text>

      {/* Section 6 */}
      <Text style={styles.heading}>6. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        All content, trademarks, and intellectual property are owned by
        Growfico or its licensors and protected by law.
      </Text>

      {/* Section 7 */}
      <Text style={styles.heading}>7. Third-Party Services</Text>
      <Text style={styles.paragraph}>
        We are not responsible for third-party websites or services linked
        through our platform.
      </Text>

      {/* Section 8 */}
      <Text style={styles.heading}>8. Disclaimers</Text>
      <Text style={styles.paragraph}>
        Services are provided "as is" without warranties of any kind.
      </Text>

      {/* Section 9 */}
      <Text style={styles.heading}>9. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        Growfico will not be liable for indirect or consequential damages.
      </Text>

      {/* Section 10 */}
      <Text style={styles.heading}>10. Indemnification</Text>
      <Text style={styles.paragraph}>
        You agree to indemnify and hold Growfico harmless from claims arising
        from misuse of the Services.
      </Text>

      {/* Section 11 */}
      <Text style={styles.heading}>11. Governing Law</Text>
      <Text style={styles.paragraph}>
        These Terms are governed by applicable jurisdiction laws.
      </Text>

      {/* Section 12 */}
      <Text style={styles.heading}>12. Changes to Terms</Text>
      <Text style={styles.paragraph}>
        We may update these Terms from time to time.
      </Text>

      {/* Section 13 */}
      <Text style={styles.heading}>13. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have questions, contact us at{' '}
        <Text style={styles.link} onPress={openEmail}>
          growficoofficial@gmail.com
        </Text>
      </Text>

      <View style={{ height: 40 }} />
    <CustomFooter />
    </ScrollView>
  );
};

export default TermsPolicy;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#0f3a03',
    marginBottom: 6,
  },

  date: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },

  dateHighlight: {
    color: '#374151',
    fontFamily: 'Poppins-Medium',
  },

  heading: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 6,
    color: '#1f6908',
    fontFamily: 'Poppins-SemiBold',
  },

  paragraph: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },

  link: {
    color: '#47bf24',
    fontFamily: 'Poppins-SemiBold',
  },

});