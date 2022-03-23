<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323083926 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccination ADD infirmier_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B099999C2BE0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id)');
        $this->addSql('CREATE INDEX IDX_1B099999C2BE0752 ON vaccination (infirmier_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccination DROP FOREIGN KEY FK_1B099999C2BE0752');
        $this->addSql('DROP INDEX IDX_1B099999C2BE0752 ON vaccination');
        $this->addSql('ALTER TABLE vaccination DROP infirmier_id');
    }
}
