import { Button, Text } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
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
}

const Paginator: React.FC<PaginatorProps> = ({
  count,
  loading,
  onChangePage
}: PaginatorProps) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage] = useState(Math.floor(count / 50))

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
    onChangePage(page);
  }, [onChangePage]);

  const renderButtons = useCallback(() => {
    const interval = 5;
    const minPage: number = Math.min(...[currentPage, Math.abs(lastPage - interval)])
    const maxPage: number = Math.min(...[currentPage + interval, lastPage])
    const buttons = [];

    // eslint-disable-next-line no-plusplus
    for (let i = minPage; i < maxPage; i++) {
      buttons.push(
        <Button disabled={currentPage === i || loading} key={i} onPress={() => handleChangePage(i)} test-id={`page-button-${i}`}>
          <Text>
            {i + 1}
          </Text>
        </Button>
      )
    }
    return buttons;
  }, [])

  return (
    <View style={styles.paginator}>
      <Button disabled={currentPage === 0 || loading} onPress={() => handleChangePage(currentPage - 1)} test-id="prev">
        <Text>
          {t('previous')}
        </Text>
      </Button>
      { renderButtons()}
      <Button disabled={currentPage === lastPage || loading} onPress={() => handleChangePage(currentPage + 1)} test-id="next">
        <Text>
          {t('next')}
        </Text>
      </Button>
    </View>
  )
}

export default memo(Paginator);