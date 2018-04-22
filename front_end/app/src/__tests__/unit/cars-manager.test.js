import React from 'react';
import CarsManager from '../../services/cars-manager';

it('Should mock service to return appropriate data', async () => {
  const expectedValue = [{ name: 'audi', year: '1990', country: 'germany' }];
  const serviceMock = jest.fn().mockResolvedValue(expectedValue);

  const result = await serviceMock();
  expect(serviceMock).toBeCalled();

  expect(result).toEqual(expectedValue);
});