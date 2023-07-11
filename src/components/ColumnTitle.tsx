import classNames from 'classnames';

type Props = {
  name: string;
  onSelect: (value: string) => void;
  sortType: string;
  isReversed: boolean;
};

export const ColumnTitle: React.FC<Props> = (
  {
    name,
    onSelect,
    sortType,
    isReversed,
  },
) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {name}

      <a
        href="#/"
        onClick={() => onSelect(name)}
      >
        <span className="icon">
          <i
            data-cy="SortIcon"
            className={classNames('fas', {
              'fa-sort': sortType !== name,
              'fa-sort-down': sortType === name && isReversed,
              'fa-sort-up': sortType === name && !isReversed,
            })}
          />
        </span>
      </a>
    </span>
  </th>
);
