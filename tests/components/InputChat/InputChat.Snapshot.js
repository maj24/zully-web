import React from 'react';
import {shallow} from 'enzyme';
import InputChat from '../../../src/shared/components/form/InputChat';
import UploadImageChatButton from '../../../src/dashboard/project/UploadImageChatButton';
import ImageUpload from '../../../src/dashboard/project/ImageUpload';
import {Input} from 'antd';

const setup = propsOverrides => {
  const props = Object.assign({
    placeholder: '',
    onSendMessageRequest: jest.fn(),
    onSendImageRequest: jest.fn(),
  }, propsOverrides);

  const inputChat = shallow(<InputChat {...props}/>);

  return {
    inputChat,
  };
};


describe('InputChat Component', () => {

  test('renders', () => {
    const { inputChat } = setup();
    expect(inputChat).toMatchSnapshot();
  });
});


