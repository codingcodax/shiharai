'use client';

import { useEffect, useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  Cell,
  CellBody,
  CellGroup,
  Cells,
  CellTitle,
  CellValue,
} from '~/components/ui/cell';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { capitalize } from '~/utils/capitalize';

export const ThemeCell = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Cell>
        <CellBody>
          <CellTitle>Theme</CellTitle>
        </CellBody>
      </Cell>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Cell>
          <CellBody>
            <CellTitle>Theme</CellTitle>
          </CellBody>
          <CellBody>
            <CellValue>{capitalize(theme ?? '')}</CellValue>
          </CellBody>
        </Cell>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Theme</DrawerTitle>
          <DrawerDescription>
            Change the default theme of Shiharai.
          </DrawerDescription>
        </DrawerHeader>

        <div>
          <CellGroup>
            <Cells>
              <Cell onClick={() => setTheme('light')}>
                <CellBody>
                  <CellTitle>Light</CellTitle>
                </CellBody>
                {theme === 'light' && <CheckIcon />}
              </Cell>

              <Cell onClick={() => setTheme('dark')}>
                <CellBody>
                  <CellTitle>Dark</CellTitle>
                </CellBody>
                {theme === 'dark' && <CheckIcon />}
              </Cell>

              <Cell onClick={() => setTheme('system')}>
                <CellBody>
                  <CellTitle>System</CellTitle>
                </CellBody>
                {theme === 'system' && <CheckIcon />}
              </Cell>
            </Cells>
          </CellGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
