<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323081428 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccin ADD vaccin_type_id INT NOT NULL');
        $this->addSql('ALTER TABLE vaccin ADD CONSTRAINT FK_B5DCA0A7EBFC0B25 FOREIGN KEY (vaccin_type_id) REFERENCES vaccin_type (id)');
        $this->addSql('CREATE INDEX IDX_B5DCA0A7EBFC0B25 ON vaccin (vaccin_type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccin DROP FOREIGN KEY FK_B5DCA0A7EBFC0B25');
        $this->addSql('DROP INDEX IDX_B5DCA0A7EBFC0B25 ON vaccin');
        $this->addSql('ALTER TABLE vaccin DROP vaccin_type_id');
    }
}
