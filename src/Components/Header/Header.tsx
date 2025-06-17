import { IconCloudUpload, IconPlayerPlayFilled } from '@tabler/icons-react';
import { Button, Container, Text } from '@mantine/core';
import classes from './HeaderMenu.module.css';
import { useEditor } from '../../context/EditorContext';
import { memo } from 'react';

export const Header = memo(function Header() {
  const { runCode } = useEditor();

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.headerContainer}>
        <div className={classes.headerContent}>
          <Text className={classes.title}>Questions List</Text>
          <div className={classes.buttonGroup}>
            <Button className={classes.btnrun} onClick={runCode}>
              <span className={classes.buttonContent}>
                <IconPlayerPlayFilled className={classes.playIcon} height={20} />
              </span>
            </Button>
            <Button className={classes.submitButton}>
              <span className={classes.buttonContent}>
                <IconCloudUpload className={classes.submitIcon} height={20} />
                Submit
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
});