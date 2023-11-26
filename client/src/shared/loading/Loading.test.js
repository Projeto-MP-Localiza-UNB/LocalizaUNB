import renderer from 'react-test-renderer';
import Loading from './Loading';

it('Renders the loading symbol correctly after status change', () => {
  let component = renderer.create(<Loading status={false} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(<Loading status={true} />);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Renders the loading symbol with given message correctly', () => {
  const component = renderer.create(
    <Loading status={true} message="Lorem Ipsum" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
