import { Button, Icon, Text } from 'native-base';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  paginator: {
    flexDirection: "row",
    flex: 1,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 8
  }
})

export interface PaginatorProps {
  count: number;
  loading: boolean;
  onChangePage: (page: number) => void;
  interval?: number;
}

const Paginator: React.FC<PaginatorProps> = ({
  count,
  loading,
  onChangePage,
  interval = 5,
}: PaginatorProps) => {

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState(0);
  const [offset] = useState(Math.floor(interval / 2));

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
    onChangePage(page);
  }, [onChangePage]);

  useEffect(() => {
    setLastPage(Math.floor(count / 50))
  }, [count])

  const renderButtons = useCallback(() => {
    let minPage: number = Math.min(...[
      currentPage - offset, Math.abs(lastPage - interval)
    ])
    minPage = minPage < 0 ? 0 : minPage;
    let maxPage: number = Math.min(...[currentPage + interval - offset, lastPage])
    maxPage = maxPage < 5 ? 5 : maxPage;
    const buttons = [];

    // eslint-disable-next-line no-plusplus
    for (let i = minPage; i < maxPage; i++) {
      buttons.push(
        <Button bordered={currentPage !== i} disabled={currentPage === i || loading} key={i} onPress={() => handleChangePage(i)} test-id={`page-button-${i}`}>
          <Text>
            {i + 1}
          </Text>
        </Button>
      )
    }
    return buttons;
  }, [lastPage, currentPage, loading])

  const prevDisabled = currentPage === 0 || loading;
  const nextDisabled = currentPage === lastPage - 1 || loading;
  return (
    <View style={styles.paginator}>
      <Button bordered disabled={prevDisabled} onPress={() => handleChangePage(0)} test-id="first">
        <Icon name="previous" type="Foundation" />
      </Button>
      { renderButtons()}
      <Button bordered disabled={nextDisabled} onPress={() => handleChangePage(lastPage - 1)} test-id="last">
        <Icon name="next" type="Foundation" />
      </Button>
    </View>
  )
}

export default memo(Paginator);