import styled from 'styled-components';
import { SearchInput } from '../inputs/SearchInput/SearchInput';

export const TableSearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
`;
export const TableSearchInput = styled(SearchInput)`
  width: 400px;
`;

export const TableAdvancedFilterWrapper = styled.div``;
export const FilterButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

export const ContentExpandable = styled.div`
  position: relative;
  max-height: maxheight;
  overflow: hidden;
  transition: all 0.35s ease;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
