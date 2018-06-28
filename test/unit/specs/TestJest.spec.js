import { shallowMount } from '@vue/test-utils'
import Test from '@/components/Test'

const factory = (values = {}) => {
  return shallowMount(Test, {
    data: { ...values  }
  })
}

describe('Test', () => {
  it('отрисовывает приветственное сообщение', () => {
    const wrapper = factory()

    expect(wrapper.find('.message').text()).toEqual('Добро пожаловать в книгу рецептов Vue.js')
  })

  it('отрисовывает ошибку, когда имя пользователя меньше 7 символов', () => {
    const wrapper = factory({ username: 'Александр' })

    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  // it('отрисовывает ошибку, когда имя пользователя состоит только из пробелов', () => {
  //   const wrapper = factory({ username: ' '.repeat(7) })

  //   expect(wrapper.find('.error').exists()).toBeTruthy()
  // })

  // it('не отрисовывает ошибку, когда имя пользователя равно 7 символам или более', () => {
  //   const wrapper = factory({ username: 'Александр' })

  //   expect(wrapper.find('.error').exists()).toBeFalsy()
  // })
})