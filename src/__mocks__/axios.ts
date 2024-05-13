import mockAxios from 'jest-mock-axios';

// @ts-ignore
mockAxios.create = jest.fn(() => mockAxios)

export default mockAxios;