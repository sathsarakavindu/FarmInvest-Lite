import { render } from '@testing-library/react-native';
import InvestmentItem from '../components/InvestmentItem';


it('renders investment item', () => {
const { getByText } = render(
<InvestmentItem item={{ farmer_name: 'Test Farmer', crop: 'Rice', amount: 1000 }} />
);


expect(getByText('Test')).toBeTruthy();
});