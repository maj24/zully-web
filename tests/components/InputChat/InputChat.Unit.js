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
    wrappingDiv: inputChat.find('div').first(),
    ImageUploadContainer: inputChat.find('ImageUploadContainer'),
  };
};


describe('InputChat Component', () => {

  test('renders a div', () => {
    const { inputChat } = setup();
    const divs = inputChat.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    test('contains everything else that gets rendered', () => {
      const { inputChat, wrappingDiv } = setup();
      expect(wrappingDiv.children()).toEqual(inputChat.children());
    });
  });

  describe('Children', () => {
    describe('ImageInputContainer', () => {
      test('always renders a ImageUploadContainer', () => {
        const { inputChat } = setup();
        expect(inputChat.find('ImageUploadContainer').length).toBe(1);
      });

      test('it passes to the onChange prop the onImageStatusChange function', () => {
        const { inputChat, ImageUploadContainer } = setup();
        expect(inputChat.instance().onImageStatusChange).toBe(ImageUploadContainer.props().onChange);
      });

      test('it has an ImageUpload component as children', () => {
        const { ImageUploadContainer } = setup();
        expect(ImageUploadContainer.dive().find(ImageUpload).length).toBe(1);
      });

      test('it passes the UploadImageChatButton as children to ImageUpload', () => {
        const { ImageUploadContainer } = setup();
        expect(ImageUploadContainer.dive().find(ImageUpload).dive().find(UploadImageChatButton).length).toBe(1);
      });
    });

    describe('Input', () => {
      test('always renders an Input', () => {
        const { inputChat } = setup();
        expect(inputChat.find(Input).length).toBe(1);
      });
    });
  });

});


