import classNames from 'classnames';

export const Filters = ({
  owners,
  selectedOwner,
  setSelectedOwner,
  query,
  setQuery,
  categories,
  setCategories,
  categoriesList,
}) => {
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClearClick = () => {
    setQuery('');
  };

  const handleResetClick = () => {
    setQuery('');
    setSelectedOwner('All');
    setCategories(['All']);
  };

  const isCheckedCategory = categoryName => categories
    .some(category => category === categoryName);

  const selectCategory = (categoryName) => {
    if (categories.includes(categoryName)) {
      const newCategories = categories
        .filter(category => category !== categoryName);

      setCategories((prevCategories) => {
        const updatedCategories = newCategories.length === 0
          ? ['All']
          : newCategories;

        return [...updatedCategories];
      });

      return;
    }

    if (categoryName === 'All') {
      setCategories(['All']);

      return;
    }

    const categoriesWithoutAll = categories
      .filter(category => category !== 'All');

    setCategories([...categoriesWithoutAll, categoryName]);
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            className={classNames({ 'is-active': selectedOwner === 'All' })}
            onClick={() => setSelectedOwner('All')}
          >
            All
          </a>

          {owners.map(owner => (
            <a
              data-cy="FilterUser"
              href="#/"
              className={classNames(
                { 'is-active': selectedOwner === owner.name },
              )}
              key={owner.id}
              onClick={() => setSelectedOwner(owner.name)}
            >
              {owner.name}
            </a>
          ))}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={query}
              onChange={handleQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              {query.length > 0 && (
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                  onClick={handleClearClick}
                />
              )}
            </span>
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className={classNames(
              'button is-success mr-6',
              { 'is-outlined': !isCheckedCategory('All') },
            )}
            onClick={() => selectCategory('All')}
          >
            All
          </a>

          {categoriesList.map(currentCategory => (
            <a
              data-cy="Category"
              className={classNames(
                'button mr-2 my-1',
                { 'is-info': isCheckedCategory(currentCategory.title) },
              )}
              href="#/"
              key={currentCategory.id}
              onClick={() => {
                selectCategory(currentCategory.title);
              }}
            >
              {currentCategory.title}
            </a>
          ))}
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={handleResetClick}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
