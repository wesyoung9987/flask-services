import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import UserList from './UsersList';

const users = [
  {
    'active': true,
    'email': 'test@gmail.com',
    'id': 1,
    'username': 'bill'
  },
  {
    'active': true,
    'email': 'ron@mail.org',
    'id': 2,
    'username': 'ron'
  }
];

test('UserList renders properly', () => {
  const wrapper = shallow(<UserList users={users}/>);
  const element = wrapper.find('h4');
  expect(element.length).toBe(2);
  expect(element.get(0).props.children).toBe('bill');
});

test('UserList renders a snapshot correctly', () => {
  const tree =  renderer.create(<UserList users={users}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
