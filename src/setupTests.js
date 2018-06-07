// import polyfils from '../jest/polyfils' // eslint-disable-line
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest'

configure({ adapter: new Adapter() })

beforeEach(() => {
  jest.clearAllMocks()
})
