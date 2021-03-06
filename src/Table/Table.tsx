import * as React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {
  BodyCellStyles,
  BodyCellStylesNone,
  BodyRowStyles,
  HeaderCellStyles,
  HeaderCellWrapper,
  HeaderRowStyles,
  SortingStyles,
  TableStyles,
} from './Table.styles';

interface Props {
  width?:'stretched' | 'auto';
  data:{ header:string[]; body:object[] };
}

interface State {
  body:object[];
  header:string[];
}

export default class Table extends React.Component<Props, State> {
  private static defaultProps:Partial<Props> = {
    width: 'stretched',
  };
  constructor(props:Props) {
    super(props);
    this.state = {
      body: this.props.data.body,
      header: this.props.data.header,
    };
  }

  public sortData = (event:any, sorter:string, key:string):void => {
    if (sorter === 'az') {
      const sorted:object[] = this.state.body.sort((a:any, b:any) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });
      this.setState({ body: sorted });
    } else if (sorter === 'za') {
      const sorted:object[] = this.state.body.sort((a:any, b:any) => {
        if (a[key] > b[key]) {
          return -1;
        }
        if (a[key] < b[key]) {
          return 1;
        }
        return 0;
      });
      this.setState({ body: sorted });
    }
  }

  public render():any {
    return (
      <TableStyles {...this.props}>
        <thead>
          <HeaderRowStyles>
            {this.state.header.map((item:string, i:number) => {
              return (
                <HeaderCellStyles key={i}>
                <HeaderCellWrapper>
                  {item}
                  <SortingStyles>
                    <Button
                     mode="flat"
                     type="secondary"
                     size="s"
                     stretched={false}
                     icon={<Icon icon="ChevronSvg" size="xs" color="#f6f6f6" />}
                     onClick={(e) => this.sortData(e, 'za', item)}
                    />
                    <Button
                     mode="flat"
                     type="secondary"
                     size="s"
                     stretched={false}
                     icon={<Icon icon="ChevronSvg" size="xs" />}
                     onClick={(e) => this.sortData(e, 'az', item)}
                    />
                  </SortingStyles>
                </HeaderCellWrapper>
            </HeaderCellStyles>
              );
            })}
          </HeaderRowStyles>
        </thead>
        <tbody>
          {this.state.body.map(
            (item:any, i:number):any => {
              return (
                <BodyRowStyles key={i}>
                  {this.props.data.header.map((elem:string, e:number) => {
                    return item[elem] ? (
                      <BodyCellStyles key={e}>{item[elem]}</BodyCellStyles>
                    ) : (
                      <BodyCellStylesNone key={e}>none</BodyCellStylesNone>
                    );
                  })}
                </BodyRowStyles>
              );
            },
          )}
        </tbody>
      </TableStyles>
    );
  }
}
