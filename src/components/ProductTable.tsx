/* eslint-disable react/jsx-no-bind */
import React from 'react';
import classNames from 'classnames';
import { Product } from '../types';
import { ColumnTitle } from './ColumnTitle';

type Props = {
  products: Product[],
  isReversed: boolean,
  sortType: string,
  onReverseChange: (value: boolean) => void,
  onSortTypeChange: (value: string) => void,
};

export const ProductTable: React.FC<Props> = ({
  products,
  isReversed,
  sortType,
  onReverseChange,
  onSortTypeChange,
}) => {
  function sortBy(newSortType: string) {
    const firstClick = newSortType !== sortType;
    const secondClick = newSortType === sortType && !isReversed;
    const thirdClick = newSortType === sortType && isReversed;

    if (firstClick) {
      onSortTypeChange(newSortType);
      onReverseChange(false);

      return;
    }

    if (secondClick) {
      onSortTypeChange(newSortType);
      onReverseChange(true);

      return;
    }

    if (thirdClick) {
      onSortTypeChange('');
      onReverseChange(false);
    }
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <ColumnTitle
            name="ID"
            onSelect={sortBy}
            sortType={sortType}
            isReversed={isReversed}
          />

          <ColumnTitle
            name="Product"
            onSelect={sortBy}
            sortType={sortType}
            isReversed={isReversed}
          />

          <ColumnTitle
            name="Category"
            onSelect={sortBy}
            sortType={sortType}
            isReversed={isReversed}
          />

          <ColumnTitle
            name="User"
            onSelect={sortBy}
            sortType={sortType}
            isReversed={isReversed}
          />
        </tr>
      </thead>

      <tbody>
        {products.map(({ category, user, ...product }) => (
          <tr data-cy="Product" key={product.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">
              {product.name}
            </td>

            <td data-cy="ProductCategory">
              {`${category?.icon} - ${category?.title}`}
            </td>

            <td
              data-cy="ProductUser"
              className={classNames({
                'has-text-link': user?.sex === 'm',
                'has-text-danger': user?.sex === 'f',
              })}
            >
              {user?.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
